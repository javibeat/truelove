# Local preview server: never caches, and sends the same security headers as production (vercel.json),
# so anything the Content-Security-Policy would block in production is blocked here too.
import http.server, functools, json, pathlib
HEADERS = [h for rule in json.loads(pathlib.Path('vercel.json').read_text())['headers'] if rule['source'] == '/(.*)' for h in rule['headers']]
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        for h in HEADERS:
            if h['key'] == 'Strict-Transport-Security': continue   # not over plain http
            value = h['value'].replace('; upgrade-insecure-requests', '') if h['key'] == 'Content-Security-Policy' else h['value']
            self.send_header(h['key'], value)
        super().end_headers()
    def send_error(self, code, message=None, explain=None):
        if code == 404 and pathlib.Path('404.html').exists():   # like Vercel: serve the custom 404 page
            body = pathlib.Path('404.html').read_bytes()
            self.send_response(404); self.send_header('Content-Type', 'text/html; charset=utf-8'); self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body); return
        super().send_error(code, message, explain)
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(('127.0.0.1', 8766), functools.partial(H, directory='.')).serve_forever()

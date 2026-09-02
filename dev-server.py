#!/usr/bin/env python3
"""Static dev server for Max & Bolt that never caches.

The browser (and the service worker) happily serve stale JS during
development, which makes edits look like they did nothing. This sends
no-store on everything so what you see is always what is on disk.

    python3 dev-server.py [port]
"""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5188
ROOT = os.path.dirname(os.path.abspath(__file__))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # quiet


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), NoCacheHandler) as httpd:
        print(f"Max & Bolt dev server → http://localhost:{PORT}  (no-cache)")
        httpd.serve_forever()

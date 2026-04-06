#!/usr/bin/env python3
"""Simple local server for the PAB Restoration static site."""

from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Run a simple Python server for the PAB Restoration site."
    )
    parser.add_argument(
        "--host",
        default="0.0.0.0",
        help="Host interface to bind to (default: 0.0.0.0).",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port to listen on (default: 8000).",
    )
    return parser


def run_server(host: str, port: int) -> None:
    project_dir = Path(__file__).resolve().parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(project_dir))
    server = ThreadingHTTPServer((host, port), handler)

    print(f"Serving PAB Restoration at http://{host}:{port}")
    print(f"Root directory: {project_dir}")
    print("Press Ctrl+C to stop.")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


def main() -> None:
    args = build_parser().parse_args()
    run_server(args.host, args.port)


if __name__ == "__main__":
    main()

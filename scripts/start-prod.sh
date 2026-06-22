#!/bin/bash
# DevTrack Production Server Start Script
# Starts the production server in a fully detached background process

cd /home/z/my-project/.next/standalone

# Kill any existing server
pkill -f "server.js" 2>/dev/null || true
sleep 2

# Start with setsid to fully detach from controlling terminal
setsid bun server.js > /home/z/my-project/production.log 2>&1 &
PID=$!
echo "Started production server with PID: $PID"
echo $PID > /home/z/my-project/.next/standalone/server.pid

# Wait for it to be ready
sleep 5

# Verify
if ps -p $PID > /dev/null; then
  echo "✓ Server is running"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>&1)
  echo "✓ HTTP response: $HTTP_CODE"
else
  echo "✗ Server failed to start"
  echo "=== Log ==="
  cat /home/z/my-project/production.log
fi

{
  "apps": [{
    "name": "wuhan-life",
    "script": "npm",
    "args": "run start",
    "cwd": "/var/www/wuhan-life",
    "instances": 1,
    "exec_mode": "fork",
    "max_memory_restart": "1.5G",
    "env": {
      "NODE_ENV": "production",
      "NODE_OPTIONS": "--max-old-space-size=1536"
    },
    "error_file": "/var/log/pm2/wuhan-life-error.log",
    "out_file": "/var/log/pm2/wuhan-life-out.log",
    "log_date_format": "YYYY-MM-DD HH:mm:ss",
    "merge_logs": true,
    "autorestart": true,
    "watch": false,
    "ignore_watch": ["node_modules", ".next", "logs"]
  }]
}

# emNaviBoard

emNaviBoard 是 emNaviDevSuite 的一部分，是基于vue.js构建的前端管理面板。

## 快速构建

首先安装 pnpm 和 node.js
```bash
git clone https://github.com/hyaline-wang/emNaviboard.git
cd emNaviboard
pnpm install 
# Compile and Hot-Reload for Development
pnpm dev
# Type-Check, Compile and Minify for Production
pnpm build
```

## 部署

```bash
scp -r dist emnavi@192.168.108.1:~
sudo rm -rf /www/
sudo mv dist/ /www 
sudo chmod -R 755 /www/
```

## nginx 设置

[vue单页应用 router设置 ](https://router.vuejs.org/guide/essentials/history-mode)

```
server {
    listen 80;
    server_name _;

    location /ttyd/ {
        proxy_pass http://localhost:7681/ttyd/;  # ttyd 的地址
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;  # 用于 WebSocket
        proxy_set_header Connection "upgrade";  # 用于 WebSocket
        proxy_set_header Host $host;  # 传递主机头
        proxy_set_header X-Real-IP $remote_addr;  # 传递客户端 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 传递真实 IP
        proxy_set_header X-Forwarded-Proto $scheme;  # 传递协议
    }

    location /api/{
        proxy_pass http://localhost:5000/api/;  # Flask 应用的地址
    }
    location / {
        root /www/;
        index index.html index.htm;
        add_header Cache-Control "no-store";
    }
}
```
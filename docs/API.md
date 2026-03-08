# API文档

## 概述

wuhan-life提供RESTful API，支持夜市和跑山路线的搜索、筛选、排序功能。

**基础URL：** `http://localhost:3000/api`

**认证：** 无需认证（公开API）

**响应格式：** JSON

---

## 接口列表

### 1. 搜索夜市

**路径：** `/api/search/markets`

**方法：** GET

**描述：** 搜索武汉夜市，支持关键词搜索、分页、排序、评分筛选

#### 请求参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| q | string | 否 | '' | 搜索关键词（名称/地址/描述） |
| page | number | 否 | 1 | 页码（从1开始） |
| limit | number | 否 | 10 | 每页数量（1-100） |
| sortBy | string | 否 | rating | 排序字段（rating/createdAt/name） |
| sortOrder | string | 否 | desc | 排序方向（asc/desc） |
| minRating | number | 否 | - | 最低评分（0-100） |
| maxRating | number | 否 | - | 最高评分（0-100） |

#### 响应示例

**成功响应（200）：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "户部巷夜市",
      "address": "武汉市武昌区户部巷",
      "description": "武汉最著名的夜市之一...",
      "rating": 19.31,
      "imageUrl": null,
      "districtId": 1,
      "createdAt": "2026-03-05T00:00:00.000Z",
      "districts": {
        "id": 1,
        "name": "武昌区"
      },
      "_count": {
        "foods": 5
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "totalPages": 1
  }
}
```

**错误响应（500）：**

```json
{
  "success": false,
  "error": "搜索失败"
}
```

#### 使用示例

**基础搜索：**
```bash
curl "http://localhost:3000/api/search/markets?q=户部巷"
```

**分页查询：**
```bash
curl "http://localhost:3000/api/search/markets?page=2&limit=5"
```

**评分筛选：**
```bash
curl "http://localhost:3000/api/search/markets?minRating=10&maxRating=50"
```

**排序：**
```bash
curl "http://localhost:3000/api/search/markets?sortBy=rating&sortOrder=desc"
```

---

### 2. 搜索跑山路线

**路径：** `/api/search/routes`

**方法：** GET

**描述：** 搜索武汉跑山路线，支持关键词搜索、分页、排序

#### 请求参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| q | string | 否 | '' | 搜索关键词（名称/描述） |
| page | number | 否 | 1 | 页码（从1开始） |
| limit | number | 否 | 10 | 每页数量（1-100） |
| sortBy | string | 否 | rating | 排序字段（rating/createdAt/name/difficulty） |
| sortOrder | string | 否 | desc | 排序方向（asc/desc） |

#### 响应示例

**成功响应（200）：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "东湖绿道",
      "description": "武汉最美的骑行路线...",
      "difficulty": "easy",
      "distance": 28.5,
      "duration": 120,
      "rating": 15.23,
      "imageUrl": null,
      "createdAt": "2026-03-05T00:00:00.000Z",
      "_count": {
        "waypoints": 8
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 17,
    "totalPages": 2
  }
}
```

**错误响应（500）：**

```json
{
  "success": false,
  "error": "搜索失败"
}
```

#### 使用示例

**基础搜索：**
```bash
curl "http://localhost:3000/api/search/routes?q=东湖"
```

**分页查询：**
```bash
curl "http://localhost:3000/api/search/routes?page=1&limit=5"
```

**按难度排序：**
```bash
curl "http://localhost:3000/api/search/routes?sortBy=difficulty&sortOrder=asc"
```

---

## 通用规范

### 响应格式

所有API响应遵循统一格式：

**成功响应：**
```json
{
  "success": true,
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

**错误响应：**
```json
{
  "success": false,
  "error": "错误描述"
}
```

---

### 错误码

| HTTP状态码 | 说明 |
|-----------|------|
| 200 | 成功 |
| 400 | 参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

### 分页规范

**请求参数：**
- `page`: 页码（从1开始）
- `limit`: 每页数量（1-100）

**响应格式：**
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

### 排序规范

**排序字段：**
- `rating`: 评分
- `createdAt`: 创建时间
- `name`: 名称
- `difficulty`: 难度（仅跑山路线）

**排序方向：**
- `asc`: 升序
- `desc`: 降序

---

## 数据模型

### 夜市（Market）

```typescript
{
  id: number;
  name: string;
  address: string;
  description: string;
  rating: number;
  imageUrl: string | null;
  districtId: number;
  createdAt: Date;
  districts: {
    id: number;
    name: string;
  };
  _count: {
    foods: number;
  };
}
```

---

### 跑山路线（Route）

```typescript
{
  id: number;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  distance: number;
  duration: number;
  rating: number;
  imageUrl: string | null;
  createdAt: Date;
  _count: {
    waypoints: number;
  };
}
```

---

## 速率限制

**限制：** 100请求/分钟

**超出限制响应（429）：**
```json
{
  "success": false,
  "error": "请求过于频繁，请稍后再试"
}
```

---

## 最佳实践

### 1. 分页优化

**推荐：** 每页10-20条
```bash
curl "http://localhost:3000/api/search/markets?page=1&limit=10"
```

**避免：** 每页超过100条
```bash
# ❌ 不推荐
curl "http://localhost:3000/api/search/markets?limit=500"
```

---

### 2. 缓存策略

**推荐：** 缓存静态数据
```javascript
// 客户端缓存5分钟
fetch('/api/search/markets', {
  headers: {
    'Cache-Control': 'max-age=300'
  }
})
```

---

### 3. 错误处理

**推荐：** 统一错误处理
```javascript
try {
  const res = await fetch('/api/search/markets');
  const data = await res.json();

  if (!data.success) {
    console.error('API错误:', data.error);
    return;
  }

  // 处理数据
} catch (error) {
  console.error('网络错误:', error);
}
```

---

## 更新日志

### v1.0.0 (2026-03-08)
- [OK] 初始版本
- [OK] 夜市搜索API
- [OK] 跑山路线搜索API
- [OK] 分页、排序、筛选功能

---

**文档版本：** v1.0.0
**最后更新：** 2026-03-08 08:58
**维护者：** Doc Agent

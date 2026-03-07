# wuhan-life API 文档

**版本：** v1.0
**更新时间：** 2026-03-07 19:30
**基础URL：** http://localhost:3000

---

## 📋 目录

1. [夜市API](#夜市api)
2. [跑山路线API](#跑山路线api)
3. [搜索API](#搜索api)
4. [错误处理](#错误处理)

---

## 夜市API

### 1. 获取夜市列表

**接口：** `GET /api/search/markets`

**描述：** 获取夜市列表，支持搜索、筛选、排序

**请求参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| q | string | 否 | "" | 搜索关键词 |
| page | number | 否 | 1 | 页码 |
| limit | number | 否 | 10 | 每页数量 |
| sortBy | string | 否 | rating | 排序字段（rating/viewCount/createdAt） |
| sortOrder | string | 否 | desc | 排序方式（asc/desc） |
| minRating | number | 否 | - | 最低评分 |
| maxRating | number | 否 | - | 最高评分 |

**请求示例：**

```bash
# 获取所有夜市
curl http://localhost:3000/api/search/markets

# 搜索关键词
curl "http://localhost:3000/api/search/markets?q=武汉"

# 评分筛选
curl "http://localhost:3000/api/search/markets?minRating=4.5"

# 排序
curl "http://localhost:3000/api/search/markets?sortBy=viewCount&sortOrder=desc"

# 分页
curl "http://localhost:3000/api/search/markets?page=2&limit=20"
```

**返回格式：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "吉庆街夜市",
      "districtId": 1,
      "address": "武汉市江岸区吉庆街",
      "description": "武汉最著名的夜市之一...",
      "openHours": "18:00-02:00",
      "bestTime": "20:00-23:00",
      "traffic": "地铁2号线江汉路站",
      "tips": "建议晚上8点后去...",
      "latitude": null,
      "longitude": null,
      "images": null,
      "rating": 4.5,
      "viewCount": 1250,
      "isActive": true,
      "createdAt": "2026-03-06T12:44:20.000Z",
      "updatedAt": "2026-03-06T12:44:20.000Z",
      "districts": {
        "id": 1,
        "name": "江岸区",
        "order": 1
      },
      "_count": {
        "foods": 0
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

---

### 2. 获取夜市详情

**接口：** `GET /markets/[id]`

**描述：** 获取单个夜市的详细信息

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | 是 | 夜市ID |

**请求示例：**

```bash
curl http://localhost:3000/markets/1
```

**返回格式：** HTML页面

---

## 跑山路线API

### 1. 获取跑山路线列表

**接口：** `GET /api/search/routes`

**描述：** 获取跑山路线列表，支持搜索、筛选、排序

**请求参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| q | string | 否 | "" | 搜索关键词 |
| page | number | 否 | 1 | 页码 |
| limit | number | 否 | 10 | 每页数量 |
| sortBy | string | 否 | rating | 排序字段（rating/viewCount/difficulty） |
| sortOrder | string | 否 | desc | 排序方式（asc/desc） |

**请求示例：**

```bash
# 获取所有路线
curl http://localhost:3000/api/search/routes

# 搜索关键词
curl "http://localhost:3000/api/search/routes?q=东湖"

# 排序
curl "http://localhost:3000/api/search/routes?sortBy=difficulty&sortOrder=asc"

# 分页
curl "http://localhost:3000/api/search/routes?page=2&limit=20"
```

**返回格式：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "东湖绿道环线",
      "direction": "顺时针",
      "distance": 28000,
      "duration": "2小时",
      "difficulty": 2,
      "description": "武汉最美的骑行路线...",
      "roadCondition": "全程柏油路，路况良好",
      "bestSeason": "春秋两季",
      "tips": "建议早上出发...",
      "startpoint": "东湖绿道入口",
      "endpoint": "东湖绿道入口",
      "coordinates": null,
      "images": null,
      "rating": 4.6,
      "viewCount": 1890,
      "isActive": true,
      "createdAt": "2026-03-06T12:44:20.000Z",
      "updatedAt": "2026-03-06T12:44:20.000Z",
      "_count": {
        "waypoints": 5
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

---

### 2. 获取跑山路线详情

**接口：** `GET /routes/[id]`

**描述：** 获取单条跑山路线的详细信息

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | 是 | 路线ID |

**请求示例：**

```bash
curl http://localhost:3000/routes/1
```

**返回格式：** HTML页面

---

## 搜索API

### 综合搜索

**接口：** `GET /search`

**描述：** 综合搜索夜市和跑山路线

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| q | string | 是 | 搜索关键词 |

**请求示例：**

```bash
curl "http://localhost:3000/search?q=东湖"
```

**返回格式：** HTML页面

---

## 错误处理

### 错误响应格式

```json
{
  "success": false,
  "error": "错误信息"
}
```

### 常见错误码

| 状态码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 📝 使用示例

### JavaScript/TypeScript

```javascript
// 获取夜市列表
const response = await fetch('/api/search/markets?q=武汉&minRating=4.5');
const data = await response.json();
console.log(data);

// 获取跑山路线列表
const response2 = await fetch('/api/search/routes?sortBy=rating');
const data2 = await response2.json();
console.log(data2);
```

### Python

```python
import requests

# 获取夜市列表
response = requests.get('http://localhost:3000/api/search/markets', params={
    'q': '武汉',
    'minRating': 4.5
})
data = response.json()
print(data)

# 获取跑山路线列表
response2 = requests.get('http://localhost:3000/api/search/routes', params={
    'sortBy': 'rating'
})
data2 = response2.json()
print(data2)
```

---

## 🔧 开发说明

### 数据模型

**夜市（markets）：**
- id: 主键
- name: 名称
- districtId: 行政区ID
- address: 地址
- description: 描述
- openHours: 营业时间
- bestTime: 最佳时间
- traffic: 交通信息
- tips: 小贴士
- latitude/longitude: 经纬度（待补充）
- rating: 评分（0-5）
- viewCount: 浏览次数

**跑山路线（routes）：**
- id: 主键
- name: 名称
- direction: 方向
- distance: 距离（米）
- duration: 时长
- difficulty: 难度（1-4）
- description: 描述
- roadCondition: 路况
- bestSeason: 最佳季节
- tips: 小贴士
- startpoint/endpoint: 起点/终点
- coordinates: 坐标（待补充）
- rating: 评分（0-5）
- viewCount: 浏览次数

---

**文档维护：** Dev + Doc Agent
**审核：** QA Agent
**版本历史：**
- v1.0 (2026-03-07): 初始版本

module.exports = {
  "index": "src/server/public/index.html",
  "staticAssets": [
    {"dir": "dist", "as": "/"},
    {"dir": "src/server/public", "as": "/"},
  ],
  "indexServingPaths": [
  ],
};
// Packview 3D 交互预览器 (model-viewer, 离线优先 CDN 回退)
(function(){
  function loadScript(src, cb){
    var s=document.createElement('script'); s.src=src; s.onload=cb;
    s.onerror=function(){
      // vendor 缺失时回退 CDN
      if(src.indexOf('vendor/')>=0){
        var cdn = src.replace('vendor/','https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/');
        var s2=document.createElement('script'); s2.src=cdn; s2.onload=cb; s2.onerror=cb;
        document.head.appendChild(s2);
      } else { cb(); }
    };
    document.head.appendChild(s);
  }
  loadScript('vendor/model-viewer.min.js', function(){
    var mv = document.querySelector('model-viewer');
    if(!mv) return;
    mv.addEventListener('load', function(){
      document.getElementById('status').textContent='3D 模型已加载';
      document.getElementById('status').style.background='#1a3d2e';
      document.getElementById('status').style.color='#6ee7b7';
    });
    mv.addEventListener('error', function(e){
      document.getElementById('status').textContent='模型加载失败 (离线需先: node install_vendor.js)';
      document.getElementById('status').style.background='#3d1a1a';
      document.getElementById('status').style.color='#fca5a5';
    });
  });
})();

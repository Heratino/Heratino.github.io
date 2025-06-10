MathJax = {
  loader: {
    load: [
      '[tex]/physics', 
      '[tex]/ams',
      '[tex]/color',
      '[tex]/autoload'
    ]
  },
  tex: {
    packages: {'[+]': ['physics', 'ams', 'color', 'autoload']},
    inlineMath: [
      // Pandoc 默认使用 $...$ 和 \(...\)
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [
      // Pandoc 默认使用 $$...$$ 和 \[...\]
      ['$$', '$$'],
      ['\\[', '\\]']
    ],
    tags: 'ams',
    physics: {
      italicdiff: true,
      arrowdel: true
    },
    processEscapes: true,
    autoload: {
      color: [],
      colorV2: ['color']
    }
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  startup: {
    ready: () => {
      console.log('MathJax 3 已加载，版本:', MathJax.version);
      console.log('已激活扩展:', Object.keys(MathJax.tex.packages));
      
      // 添加 Pandoc 特定处理
      MathJax.startup.input.mathFilters.push((math, doc) => {
        // 处理 Pandoc 生成的公式环境
        if (math.math.includes('\\begin')) {
          math.math = math.math.replace(/\\begin\{(\w+)\*?\}/g, '\\begin{$1}')
                              .replace(/\\end\{(\w+)\*?\}/g, '\\end{$1}');
        }
        return math;
      });
      
      return MathJax.startup.defaultReady();
    }
  }
};
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.min.js" async></script>
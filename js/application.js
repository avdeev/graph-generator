(function() {
  $(function() {
    var $edgeCount, $form, $output, $vertexCount;
    $form = $('#form-input-data');
    $vertexCount = $('#vertex-count');
    $edgeCount = $('#edge-count');
    $output = $('#output');
    return $form.on('submit', function(e) {
      var addEdge, edgeCount, getRandom, graph, i, isEdgeExist, j, maxEdgeCount, output, realEdgeCounter, vertexCount, _i, _j, _k, _l, _m, _ref, _ref1, _ref2;
      e.preventDefault();
      vertexCount = parseInt($vertexCount.val());
      edgeCount = parseInt($edgeCount.val());
      maxEdgeCount = vertexCount * (vertexCount - 1) / 2;
      realEdgeCounter = 0;
      graph = [];
      for (i = _i = 0, _ref = vertexCount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        graph[i] = [];
        for (j = _j = 0; 0 <= vertexCount ? _j <= vertexCount : _j >= vertexCount; j = 0 <= vertexCount ? ++_j : --_j) {
          graph[i][j] = 0;
        }
      }
      addEdge = function(i, j) {
        graph[j][i] = graph[i][j] = 1;
        return realEdgeCounter += 1;
      };
      isEdgeExist = function(i, j) {
        return graph[j][i] === 1 && graph[i][j] === 1;
      };
      getRandom = function(min, max) {
        if (min == null) {
          min = 0;
        }
        return Math.floor(Math.random() * (max - min) + min);
      };
      for (i = _k = 0, _ref1 = vertexCount - 1; 0 <= _ref1 ? _k <= _ref1 : _k >= _ref1; i = 0 <= _ref1 ? ++_k : --_k) {
        if (i < vertexCount - 1) {
          addEdge(i, i + 1);
        } else {
          addEdge(i, 0);
        }
      }
      while (true) {
        i = getRandom(0, vertexCount - 1);
        j = getRandom(0, vertexCount - 1);
        if (!isEdgeExist(i, j)) {
          addEdge(i, j);
        }
        if (realEdgeCounter >= edgeCount || realEdgeCounter >= maxEdgeCount) {
          break;
        }
      }
      output = '';
      for (i = _l = 0, _ref2 = vertexCount - 1; 0 <= _ref2 ? _l <= _ref2 : _l >= _ref2; i = 0 <= _ref2 ? ++_l : --_l) {
        for (j = _m = 0; 0 <= i ? _m <= i : _m >= i; j = 0 <= i ? ++_m : --_m) {
          if (isEdgeExist(i, j)) {
            output += "" + (j + 1) + "-" + (i + 1) + "\n";
          }
        }
      }
      $output.html($('<pre>').html(output));
      $output.prepend($('<br><br>'));
      return $output.prepend($('<button class="btn btn-default">Сохранить в файл</button>').on('click', function(e) {
        var blob;
        blob = new Blob([output], {
          type: "text/plain;charset=utf-8"
        });
        return saveAs(blob, "graph.txt");
      }));
    });
  });

}).call(this);

$ ->
  $form = $ '#form-input-data'
  $vertexCount = $ '#vertex-count'
  $edgeCount = $ '#edge-count'
  $output = $ '#output'

  $form.on 'submit', (e) ->
    e.preventDefault()

    vertexCount = parseInt $vertexCount.val()
    edgeCount = parseInt $edgeCount.val()

    maxEdgeCount = vertexCount * (vertexCount - 1) / 2

    realEdgeCounter = 0

    graph = []
    for i in [0..(vertexCount - 1)]
      graph[i] = []
      graph[i][j] = 0 for j in [0..vertexCount]

    addEdge = (i, j) ->
      graph[j][i] = graph[i][j] = 1
      realEdgeCounter += 1

    isEdgeExist = (i, j) ->
      graph[j][i] is 1 and graph[i][j] is 1

    getRandom = (min = 0, max) ->
      Math.floor(Math.random() * (max - min) + min)
        
    # создаём цикл
    for i in [0..(vertexCount - 1)]
      if i < vertexCount - 1
        addEdge(i, i + 1)
      else
        addEdge(i, 0)

    loop
      i = getRandom(0, vertexCount - 1)
      j = getRandom(0, vertexCount - 1)
      addEdge(i, j) unless isEdgeExist(i, j)
      break if realEdgeCounter >= edgeCount or realEdgeCounter >= maxEdgeCount

    output = ''
    for i in [0..(vertexCount - 1)]
      for j in [0..i]
        if isEdgeExist(i, j)
          output += "#{j + 1}-#{i + 1}\n"
    
    $output.html $('<pre>').html output
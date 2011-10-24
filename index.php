<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="chess.js"></script>
    <script type="text/javascript" src="play.js"></script>
  </head>
  <body>
    <div id="wrapper">
      <div id="board">
	<table>
	  <tbody>
<?php
	for( $i = 0; i < 8; i ++ ){
	  print '<tr id="row_"' . $i . '">';
	  for( $j = 0; j < 8; j ++ ){
	    print '<td id="col_"' . $j . '"></td>';
	  }
	  '</tr>';
	}
?>
	  </tbody>
	</table>
      </div>
    </div>
  </body>
</html>

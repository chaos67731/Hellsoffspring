<?php
// if ( $_POST['payload'] ) {
//     if (($payload = json_decode($_POST['payload'], true)) 
//         && isset($payload['repository'])
//     && isset($payload['repository']['id'])
//     && $payload['repository']['id'] == 76484249
//     && isset($payload['repository']['name'])
//     && $payload['repository']['name'] == 'MuchGames'
//     ) {
        $execOutput = shell_exec('/kunden/homepages/42/d323263551/htdocs/hellsoffspring.com/deploy.sh 2>&1');
        echo($execOutput);
        echo('finished script');
//     }
// }
?>
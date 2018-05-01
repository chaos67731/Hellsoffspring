<?php
// if ( $_POST['payload'] ) {
//     if (($payload = json_decode($_POST['payload'], true)) 
//         && isset($payload['repository'])
//     && isset($payload['repository']['id'])
//     && $payload['repository']['id'] == 76484249
//     && isset($payload['repository']['name'])
//     && $payload['repository']['name'] == 'MuchGames'
//     ) {
        $execOutput = shell_exec('deploy.sh');
        echo($execOutput);
        echo('finished script');
//     }
// }
?>
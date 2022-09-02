<?php

$file = new \SplFileObject("testenc.csv");
$file->setFlags(\SplFileObject::READ_CSV);

$values = [];
foreach ($file as $row) {
    $values[] = $row;
}

$values = array_filter($values);
$array_final = [];

foreach ($values as $key => $item) {

    if (isset($item[0]) && !empty($item[0])) {

        $username = explode(" ", $item[0]);
        $firstname = mb_strtolower($username[0]);
        $lastname = mb_strtolower(end($username));

        $array_final[] = [
            'firstname' => ucfirst($firstname),
            'lastname' => ucfirst($lastname),
            'sector' => ucwords(mb_strtolower($item[2])),
            'local' => $item[1]
        ];
        
    }
}

$array_final_final_mesmo = array_chunk($array_final, 4);

// print_r($array_final_final_mesmo);
// exit;

foreach ($array_final_final_mesmo as $key => $item) {
    echo "<tr id='fotos_" . $key . "'>\r\n";
    foreach($item as $value){
        echo gerar_fotos($value['firstname'], $value['lastname']);
    }
    echo "</tr>\r\n";
    
    echo "<tr id='informacoes_" . $key . "'>\r\n";
    foreach($item as $value){
        echo gerar_valores($value['firstname'], $value['lastname'], $value['sector'], $value['local']);
    }
    echo "</tr>\r\n";
}


function gerar_fotos($firstname, $lastname)
{
    return  '
            <td width="150">
            <img style="width: 120px; height: 160px; display: block; margin-left: auto; margin-right: auto; border-radius: 10%; border: 1px solid; border-color: #ab9b6a;"
                src="https://arquivos.essentialnutrition.com.br/images/novos-colaboradores/' . ucfirst($firstname) . ucfirst($lastname) . '.jpg"
                alt="" />
            </td>';
}

function gerar_valores($firstname, $lastname, $sector, $local)
{
    return 
            '  <td width="150">
                  <p style="text-align: center; font-family: arial, sans-serif; color: #1a1a1a; font-size: 12px; line-height: 18px; margin-bottom: 30px;">
                    <b>'  . ucfirst($firstname) . ' ' . ucfirst($lastname) . '<br /></b>' . ucfirst(mb_strtolower($sector)) . ' <br /> ' . $local . '
                  </p>
              </td>';
}
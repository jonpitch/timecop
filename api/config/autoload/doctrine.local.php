<?php

return array(
	'doctrine' => array(
		'connection' => array(
			'orm_default' => array(
				'driverClass' =>'Doctrine\DBAL\Driver\PDOPgSql\Driver',
				'params' => array(
					'host'     => '192.168.50.4',
					'port'     => '5432',
					'user'     => 'timecop',
					'password' => 'jcvd',
					'dbname'   => 'timecop',
				)
			)
		),
	),
);

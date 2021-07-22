/*
 * FossID Remove Identification Tool 1.0.1
 * Copyright (c) 2021 junsulee
 *
 * This source code is proprietary to the copyright holder and/or confidential.
 * All rights reserved. Reproduction, modification or re-distribution,
 * in whole or in part, is strictly prohibited without permission.
 */

const request = require('request');

const args = process.argv;

const serverurl = args[2];
const username = args[3];
const apikey = args[4];
const scancode = args[5];
const path = args[6];

let removeComponentIdentificationDString = {
	'group': 'files_and_folders',
	'action': 'remove_component_identification',
	'data': {
		'username': username,
		'key': apikey,
		'scan_code': scancode,
        'path': path
	}
};

function removeComponentIdentification() {
	return new Promise(function (resolve, reject) {
		request({
			url: serverurl,
			strictSSL: false,
			rejectUnauthorized: false,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Connection': 'keep-alive'
			},
			body: JSON.stringify(removeComponentIdentificationDString)
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
                console.log(body);
                console.log("Removing identifications... complete!");
			} else {
				reject(error);
			}
		});
	});
}

removeComponentIdentification();
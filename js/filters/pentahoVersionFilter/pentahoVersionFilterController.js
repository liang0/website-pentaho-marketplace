/*
 * Copyright 2002 - 2014 Webdetails, a Pentaho company.  All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

'use strict';

(function ( app, _ ) {
  app.controller('pentahoVersionFilterController',
      ['$scope',
        function ( $scope ) {

          $scope.versions = [ "7.1", "7.0", "6.1", "6.0", "5.4" ];

          $scope.selectedVersion = "7.1";

          $scope.selectVersion = function ( version ) {
            $scope.selectedVersion = version;
          }

        }
      ]);
  // TODO: assuming _ is defined
  })( angular.module('marketplace'), _ );

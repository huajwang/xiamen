#!/usr/bin/env groovy

node {
    def nodeHome = tool name: 'Node.js 6.9.5', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

    stage('clean') {
          dir('gateway-app') {
            sh "chmod +x ./gradlew"
            sh "./gradlew clean --no-daemon"	
          } 
    }

    stage('npm install') {
        dir('gateway-app') {
          sh "./gradlew npmInstall -PnodeInstall --no-daemon --stacktrace"
        }
    }

    stage('backend tests') {
        dir('gateway-app') {
          try {
            sh "./gradlew test -PnodeInstall --no-daemon"
          } catch(err) {
            throw err
          } finally {
            junit '**/build/**/TEST-*.xml'
          }
        }
    }

    stage('frontend tests') {
        dir('gateway-app') {
          try {
            sh "./gateway-app/gradlew npm_test -PnodeInstall --no-daemon"
          } catch(err) {
            throw err
          } finally {
            junit '**/build/test-results/jest/TESTS-*.xml'
          }
       } 
    }

    stage('packaging') {
        dir('gateway-app') {
          sh "./gateway-app/gradlew bootWar -x test -Pprod -PnodeInstall --no-daemon"
          archiveArtifacts artifacts: '**/build/libs/*.war', fingerprint: true
        }
    }

    stage('deployment') {
      dir('gateway-app') {
        sh "./gateway-app/gradlew deployHeroku --no-daemon"
      }
    }

}

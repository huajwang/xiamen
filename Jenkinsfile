#!/usr/bin/env groovy

node {
    stage('Initialize') {
       def dockerHome = tool 'mydocker'
       env.PATH = "${dockerHome}/bin:${env.PATH}"
    }

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
            sh "./gradlew npm_test -PnodeInstall --no-daemon"
          } catch(err) {
            throw err
          } finally {
            junit '**/build/test-results/jest/TESTS-*.xml'
          }
       }
    }

    stage('invoice tests') {
        dir('invoice') {
            try {
            sh "./gradlew test -PnodeInstall --no-daemon"
          } catch(err) {
            throw err
          } finally {
            junit '**/build/**/TEST-*.xml'
          }
        }
    }

    stage('notification tests') {
        dir('notification') {
            try {
            sh "./gradlew test -PnodeInstall --no-daemon"
          } catch(err) {
            throw err
          } finally {
            junit '**/build/**/TEST-*.xml'
          }
        }
    }

    stage('create gateway docker image') {
        dir('gateway-app') {
            withDockerRegistry([url: '',credentialsId: 'docker-hub-credentials']) {
              def customImage = docker.build("huajwang/store")
              customImage.push("${env.BUILD_NUMBER}")
              customImage.push("latest")
          }
        }
     }
    
    stage('create invoice docker image') {
        dir('invoice') {
           withDockerRegistry([url: '',credentialsId: 'docker-hub-credentials']) {
              def customImage = docker.build("huajwang/invoice")
              customImage.push("${env.BUILD_NUMBER}")
              customImage.push("latest")
          }

        }
    }
    
    stage('create notification docker image') {
        dir('notification') {
           withDockerRegistry([url: '',credentialsId: 'docker-hub-credentials']) {
              def customImage = docker.build("huajwang/notification")
              customImage.push("${env.BUILD_NUMBER}")
              customImage.push("latest")
          }

        }
    }
    
    stage('deployment') {
      dir('gateway-app') {
        sh "node --version "
      }
    }

}

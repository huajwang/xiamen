#!/usr/bin/env groovy

node {
    stage('Initialize') {
       def dockerHome = tool 'mydocker'
       def NODEJS_HOME = tool 'mynodejs'
       env.PATH = "${dockerHome}/bin:${NODEJS_HOME}/bin:${env.PATH}"
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


    stage('create gateway docker image') {
        dir('gateway-app') {
            withDockerRegistry([url: '',credentialsId: 'docker-hub-credentials']) {
              sh "./gradlew bootWar -Pprod jibDockerBuild"
              sh "docker push huajwang/store:latest"
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

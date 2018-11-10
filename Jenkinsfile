#!/usr/bin/env groovy

node {
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
            def customImage = docker.build("huajwang/gateway")
            customImage.push("${env.BUILD_NUMBER}")
            customImage.push("latest")
          }
        }
     }
    
    stage('create invoice docker image') {
        dir('invoice') {
          sh "./gradlew bootWar -Pprod jibDockerBuild --no-daemon"
          sh "docker image tag invoice huajwang/invoice"
        }
    }
    
    stage('create notification docker image') {
        dir('notification') {
          sh "./gradlew bootWar -Pprod jibDockerBuild --no-daemon"
          sh "docker image tag notification huajwang/notification"
        }
    }
    
    stage('deployment') {
      dir('gateway-app') {
        sh "node --version "
      }
    }

}

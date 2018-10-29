#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    docker.image('jhipster/jhipster:v5.5.0').inside('-u root -e GRADLE_USER_HOME=.gradle') {
        stage('check java') {
            sh "java -version"
        }

        stage('clean') {
            sh "chmod +x gradlew"
            sh "./gateway-app/gradlew clean --no-daemon"
        }

        stage('npm install') {
            sh "./gateway-app/gradlew npmInstall -PnodeInstall --no-daemon"
        }

        stage('backend tests') {
            try {
                sh "./gateway-app/gradlew test -PnodeInstall --no-daemon"
            } catch(err) {
                throw err
            } finally {
                junit '**/build/**/TEST-*.xml'
            }
        }

        stage('frontend tests') {
            try {
                sh "./gateway-app/gradlew npm_test -PnodeInstall --no-daemon"
            } catch(err) {
                throw err
            } finally {
                junit '**/build/test-results/jest/TESTS-*.xml'
            }
        }

        stage('packaging') {
            sh "./gateway-app/gradlew bootWar -x test -Pprod -PnodeInstall --no-daemon"
            archiveArtifacts artifacts: '**/build/libs/*.war', fingerprint: true
        }

        stage('deployment') {
            sh "./gateway-app/gradlew deployHeroku --no-daemon"
        }

    }
}

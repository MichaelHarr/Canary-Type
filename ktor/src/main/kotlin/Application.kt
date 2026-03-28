package com.canary

import com.canary.config.configureDatabases
import com.canary.features.level.levelModule
import io.ktor.server.application.*
import org.koin.ktor.plugin.Koin

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {

    install(Koin) {
        modules(levelModule)
    }

    configureSerialization()
    configureDatabases()
    configureRouting()
}

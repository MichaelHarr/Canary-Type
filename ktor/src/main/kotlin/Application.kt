package com.canary

import com.canary.config.configureDatabases
import com.canary.repository.LevelRepository
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    val levelRepository = LevelRepository()

    configureSerialization(levelRepository)
    configureDatabases()
    configureRouting()
}

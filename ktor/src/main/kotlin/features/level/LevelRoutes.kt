package com.canary.features.level
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.levelRoutes() {

    val levelService by inject<LevelService>()

    route("/levels") {
      get("/") {
        levelService.getAll()
        call.respond("Get all levels")
      }

      get("/{id}") {
        call.respond("Get level by id")
      }
    }
}
package com.canary

import com.canary.repository.LevelRepository
import io.ktor.http.HttpStatusCode
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.route
import io.ktor.server.routing.routing

fun Application.configureSerialization(repository: LevelRepository) {
  install(ContentNegotiation) {
    json()
  }

  routing {
    route("/levels") {
      get {
        val levels = repository.getLevels()
        call.respond(levels)
      }

      get("byNum/{levelNum}") {
        val levelNum = call.parameters["levelNum"]

        val level = repository.getLevelByLevelNumber(levelNum)

        if (level != null) {
          call.respond(level)
        } else {
          call.respond(HttpStatusCode.NotFound)
        }
      }
    }
  }
}
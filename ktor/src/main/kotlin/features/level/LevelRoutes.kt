package com.canary.features.level
import io.ktor.http.HttpStatusCode
import io.ktor.server.plugins.NotFoundException
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Route.levelRoutes() {

    val levelService by inject<LevelService>()

    route("/levels") {
      get("/") {
        val levels: List<Level> = levelService.getAll()
        call.respond(levels)
      }

      get("/{id}") {
        val id: Int? = call.parameters["id"]?.toIntOrNull()
        if (id == null) {
          call.respond(HttpStatusCode.BadRequest, "Invalid or missing id")
          return@get
        }

        try {
          val level: Level = levelService.get(id)
          call.respond(level)
        } catch (e: NotFoundException) {
          call.respond(HttpStatusCode.NotFound, "Level with id $id not found")
        }
      }
    }
}
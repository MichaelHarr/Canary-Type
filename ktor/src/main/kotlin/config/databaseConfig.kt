package com.canary.config

import io.ktor.server.application.Application
import org.jetbrains.exposed.sql.Database
import java.sql.Connection
import java.sql.DriverManager

fun Application.configureDatabases() {
  Database.connect(
    "jdbc:postgresql://localhost:5432/ktor_tutorial_db",
    user = "postgresql",
    password = "password"
  )
}

fun Application.connectToPostgres(embedded: Boolean): Connection {
  Class.forName("org.postgresql.Driver")
  if (embedded) {
    return DriverManager.getConnection("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "root", "")
  } else {
    val url = environment.config.property("ppostgres.url").getString()
    val user = environment.config.property("postgres.user").getString()
    val password = environment.config.property("postgres.password").getString()

    return DriverManager.getConnection(url, user, password)
  }
}
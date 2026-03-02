package com.canary.config

import io.ktor.server.application.Application
import org.jetbrains.exposed.sql.Database
import java.sql.Connection
import java.sql.DriverManager

fun Application.configureDatabases() {
  val host = System.getenv("DB_HOST") ?: "postgres-db"
  val port = System.getenv("DB_PORT") ?: "5432"
  val dbName = System.getenv("DB_NAME") ?: "ktor_tutorial_db"
  val user = System.getenv("DB_USER") ?: "postgres"
  val password = System.getenv("DB_PASSWORD") ?: "postgres"

  val url = "jdbc:postgresql://$host:$port/$dbName"

  // Print to stdout so the value appears in container logs even if logger isn't configured yet
  println("DEBUG: Database URL -> $url (user=$user)")
  environment.log.info("Database URL: $url (user=${user})")

  Database.connect(
    url = url,
    driver = "org.postgresql.Driver",
    user = user,
    password = password
  )
}

fun Application.connectToPostgres(embedded: Boolean): Connection {
  Class.forName("org.postgresql.Driver")
  if (embedded) {
    return DriverManager.getConnection("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "root", "")
  } else {
    val url = environment.config.property("postgres.url").getString()
    val user = environment.config.property("postgres.user").getString()
    val password = environment.config.property("postgres.password").getString()

    return DriverManager.getConnection(url, user, password)
  }
}
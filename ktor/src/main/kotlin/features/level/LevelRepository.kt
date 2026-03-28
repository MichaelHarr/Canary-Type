package com.canary.features.level

interface LevelRepository {
  fun list(): List<Level>
  fun get(id: Int): Level?
}

class InMemoryLevelRepository : LevelRepository {
  private val levels = listOf<Level>(
    Level("level 1", 1, "hello world"),
    Level("level 2", 2, "this is the second level"),
    Level("level 3", 3, "this is the final level for now!!!")
  )

  override fun list(): List<Level> {
    return levels
  }

  override fun get(id: Int): Level? {
    return levels.find { it.number == id }
  }
}

class postgresLevelRepository : LevelRepository {
  override fun list(): List<Level> {
    TODO("Not yet implemented")
  }

  override fun get(id: Int): Level? {
    TODO("Not yet implemented")
  }
}
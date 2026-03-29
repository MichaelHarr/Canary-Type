package com.canary.features.level

import io.ktor.server.plugins.NotFoundException

interface LevelService {
  fun getAll(): List<Level>
  fun get(num: Int): Level
}

class LevelServiceImpl(
  private val levelRepository: LevelRepository
) : LevelService {

  override fun getAll(): List<Level> {
      val levels = levelRepository.list()
      return levels
  }

  override fun get(num: Int): Level {
    val level = levelRepository.get(num) ?: throw NotFoundException()
    return level
  }

}
package com.canary.features.level

interface LevelService {
  fun getAll(): List<Level>
}

class LevelServiceImpl(
  private val levelRepository: LevelRepository
) : LevelService {

  override fun getAll(): List<Level> {
      val levels = levelRepository.list()
      return levels
  }

}
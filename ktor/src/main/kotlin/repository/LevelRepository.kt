package com.canary.repository

import com.canary.database.LevelDAO
import com.canary.database.LevelTable
import com.canary.database.LevelTable.name
import com.canary.database.daoToModel
import com.canary.database.suspendTransaction
import com.canary.model.Level

class LevelRepository {

  suspend fun getLevels(): List<Level> = suspendTransaction {
    LevelDAO.all().map(::daoToModel)
  }

  suspend fun getLevelByLevelNumber(levelNum: String?): Level? = suspendTransaction {
    LevelDAO
      .find { (LevelTable.name eq name) }
      .limit(1)
      .map(::daoToModel)
      .firstOrNull()
  }
}
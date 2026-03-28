package com.canary.database

import com.canary.features.level.Level
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

object LevelTable : IntIdTable("level") {
  val name = varchar("name", 50)
  val number = varchar("number", 50)
  val typingText = varchar("typingtext", 50)
}

class LevelDAO(id: EntityID<Int>): IntEntity(id) {
  companion object : IntEntityClass<LevelDAO>(LevelTable)

  var name by LevelTable.name
  var number by LevelTable.number
  var typingText by LevelTable.typingText
}

suspend fun <T> suspendTransaction(block: Transaction.() -> T): T =
  newSuspendedTransaction(Dispatchers.IO, statement = block)

fun daoToModel(dao: LevelDAO) = Level(
  name = dao.name,
  number = dao.number.toInt(),
  text = dao.typingText
)


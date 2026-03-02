package com.canary.model

import kotlinx.serialization.Serializable

@Serializable
data class Level(
  val num: Int,
  val name: String,
  val typingText: String
)
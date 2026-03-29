package com.canary.features.level

import kotlinx.serialization.Serializable

@Serializable
data class Level(
  val name: String,
  val number: Int,
  val text: String
) { }

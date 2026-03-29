package com.canary.features.level

import org.koin.dsl.bind
import org.koin.dsl.module
import org.koin.plugin.module.dsl.single

val levelModule = module {
  single<LevelServiceImpl>() bind LevelService::class
  single<InMemoryLevelRepository>() bind LevelRepository::class
}
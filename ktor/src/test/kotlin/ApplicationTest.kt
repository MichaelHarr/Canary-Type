import com.canary.module
import io.ktor.client.request.get
import io.ktor.client.statement.bodyAsText
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import io.ktor.server.testing.testApplication
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class ApplicationTest {

  @Test
  fun tasksCanBeFoundByPriority() = testApplication {
    application {
      module()
    }

    val response = client.get("/tasks/byPriority/Medium")
    val body = response.bodyAsText()

    assertEquals(HttpStatusCode.OK, response.status)
    assertContains(body, "Mow the lawn")
    assertContains(body, "Paint the fence")
  }

  @Test
  fun invalidPriorityProduces400() = testApplication {
    application {
      module()
    }

    val response = client.get("/tasks/byPriority/Invalid")
    assertEquals(HttpStatusCode.BadRequest, response.status)
  }

  @Test
  fun unusedPriorityProduces404() = testApplication {
    application {
      module()
    }

    val response = client.get("/tasks/byPriority/Vital")
    assertEquals(HttpStatusCode.NotFound, response.status)
  }
}
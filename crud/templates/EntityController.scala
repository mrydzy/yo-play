package <%= package %>.controllers

import akka.actor.Props
import <%= package %>.actors.<%= entity %>Actor
import <%= package %>.actors.messages._
import <%= package %>.models.<%= entity %>
import play.api.libs.concurrent.Akka
import play.api.mvc.Action
import play.api.Play.current
import play.api.libs.json.Json
import akka.pattern.ask
import scala.concurrent._
import ExecutionContext.Implicits.global


object <%= entity %>Controller extends BaseController {

  val <%= entityVar %>Actor = Akka.system.actorOf(Props[<%= entity %>Actor], name = "<%= entityVar %>actor")

  def create() = Action.async { request =>
    val data = request.body.asJson.get
    val <%= entityVar %> = Json.fromJson[<%= entity %>](data).getOrElse(throw new RuntimeException("Incorrect json"))
    (<%= entityVar %>Actor ? new CreateEntity[<%= entity %>](<%= entityVar %>)).map(id => {
      Ok(Json.toJson(id.asInstanceOf[Int]))
    })
  }

  def update() = Action.async { request =>
    val data = request.body.asJson.get
    val <%= entityVar %> = Json.fromJson[<%= entity %>](data).getOrElse(throw new RuntimeException("Incorrect json"))
    (<%= entityVar %>Actor ? new UpdateEntity[<%= entity %>](<%= entityVar %>)).map(affectedRows => {
      Ok(Json.toJson(affectedRows.asInstanceOf[Int]))
    })
  }

  def read(id: Int) = Action.async { request =>
    (<%= entityVar %>Actor ? new ReadEntity(id)).map(<%= entityVar %> => {
      <%= entityVar %> match {
        case Some(u: <%= entity %>) =>
          Ok(Json.toJson(u))
        case None =>
          BadRequest
      }
    })
  }

  def list() = Action.async { request =>
    (<%= entityVar %>Actor ? new ListEntities()).map(<%= entityVar %>s => {
      Ok(Json.toJson(<%= entityVar %>s.asInstanceOf[List[<%= entity %>]]))
    })
  }

  def delete(id: Int) = Action.async { request =>
    (<%= entityVar %>Actor ? new DeleteEntity(id)).map(affectedRows => {
      Ok(Json.toJson(affectedRows.asInstanceOf[Int]))
    })
  }

}

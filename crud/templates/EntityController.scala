package <%= package %>.controllers

import <%= package %>.models.{<%= entity %>Table, <%= entity %>}
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick.DB
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import play.api.Play.current

object <%= entity %>Controller extends Controller {

  val <%= entity %>Query = TableQuery[<%= entity %>Table]

  def add() = Action { request =>
    val data = request.body.asJson.get
    DB.withSession { implicit session: Session =>

      val <%= entityVar %> = Json.fromJson[<%= entity %>](data).asOpt
      if (<%= entityVar %>.isDefined) {
        <%= entity %>Query.insert(<%= entityVar %>.get)
      }
      Ok("ok")
    }
  }

  def list = Action {
    DB.withSession { implicit session: Session =>
      val <%= entityVar %>s = <%= entity %>Query.list
      Ok(Json.toJson(<%= entityVar %>s))
    }
  }

}

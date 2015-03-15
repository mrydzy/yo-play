package <%= package %>.controllers

import models.{<%= entity %>Table, <%= entity %>}
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick.DB
import play.api.mvc.{Action, Controller}
import play.api.Play.current

object <%= entity %>Controller extends Controller {

  val <%= entity %>Query = TableQuery[<%= entity %>Table]

  def add() = Action { request =>
    val data = request.body.asJson.get
    DB.withSession { implicit session: Session =>
      val <%= entityVar %> = <%= entity %>(data.\("name").toString(), data.\("surname").toString(), data.\("email").toString())
      <%= entity %>Query.insert(<%= entityVar %>)
      Ok("ok")
    }
  }

  def list = Action {
    DB.withSession { implicit session: Session =>
      val <%= entityVar %>s = <%= entity %>Query.list
      Ok(<%= entityVar %>s.toString())
    }
  }

}

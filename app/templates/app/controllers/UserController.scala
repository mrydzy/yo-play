package controllers

import models.{UserTable, User}
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick.DB
import play.api.mvc.{AnyContentAsFormUrlEncoded, AnyContentAsMultipartFormData, Action, Controller}
import play.api.Play.current
/**
 * Created by majrydzy on 14/03/15.
 */
object UserController extends Controller {

  val UserQuery = TableQuery[UserTable]

  def add() = Action { request =>
    val data = request.body.asJson.get
    DB.withSession { implicit session: Session =>
      val user = User(data.\("name").toString(), data.\("surname").toString(), data.\("email").toString())
      UserQuery.insert(user)
      Ok("ok")
    }
  }

  def list = Action {
    DB.withSession { implicit session: Session =>
      val users = UserQuery.list
      Ok(users.toString())
    }
  }

}

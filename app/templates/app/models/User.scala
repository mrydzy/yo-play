package models

import play.api.db.slick.Config.driver.simple._

case class User(name: String, surname: String, email: String)

/* Table mapping
 */
class UserTable(tag: Tag) extends Table[User](tag, "USER") {

  def username = column[String]("name", O.PrimaryKey)
  def name = column[String]("name", O.NotNull)
  def surname = column[String]("surname", O.NotNull)
  def email = column[String]("email", O.NotNull)

  def * = (name, surname, email) <> (User.tupled, User.unapply _)
}
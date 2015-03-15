package <%= package %>.models

import play.api.db.slick.Config.driver.simple._

case class <%= entity %>(name: String, surname: String, email: String)

/* Table mapping
 */
class <%= entity %>Table(tag: Tag) extends Table[<%= entity %>](tag, <%= entityTag %>) {

  def username = column[String]("name", O.PrimaryKey)
  def name = column[String]("name", O.NotNull)
  def surname = column[String]("surname", O.NotNull)
  def email = column[String]("email", O.NotNull)

  def * = (name, surname, email) <> (<%= entity %>.tupled, <%= entity %>.unapply _)
}

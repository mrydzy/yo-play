package <%= package %>.models

import play.api.db.slick.Config.driver.simple._
import play.api.libs.json._

case class <%= entity %>(id: Option[Int], <%= parametersList %>)

/* Table mapping
 */
class <%= entity %>Table(tag: Tag) extends Table[<%= entity %>](tag, <%= entityTag %>) {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  <%= fieldsDefinition %>

  def * = (id.?, <%= fieldNames %>) <> ((<%= entity %>.apply _).tupled, <%= entity %>.unapply _)
}
object <%= entity %> {
  implicit val writer = Json.writes[<%= entity %>]
  implicit val reader = Json.reads[<%= entity %>]
}

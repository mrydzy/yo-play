package <%= package %>.models

import play.api.db.slick.Config.driver.simple._

case class <%= entity %>(<%= parametersList %>)

/* Table mapping
 */
class <%= entity %>Table(tag: Tag) extends Table[<%= entity %>](tag, <%= entityTag %>) {

  def id = column[Id]("id", O.PrimaryKey)
  <%= fieldsDefinition %>


  def * = (<%= fieldNames %>) <> (<%= entity %>.tupled, <%= entity %>.unapply _)
}

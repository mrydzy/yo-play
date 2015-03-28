package <%= package %>.actors

import <%= package %>.actors.messages._

import play.api.Play.current
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick.DB

import <%= package %>.models.{<%= entity %>Table, <%= entity %>}

import scala.slick.lifted.TableQuery


class <%= entity %>Actor extends BaseActor {

  val <%= entity %>Query = TableQuery[<%= entity %>Table]

  override def receive: Receive = {
    case ListEntities() =>
      sender ! list()
    case CreateEntity(<%= entityVar %>: <%= entity %>) =>
      sender ! create(<%= entityVar %>)
    case DeleteEntity(id: Int) =>
      sender ! delete(id)
    case ReadEntity(id) =>
      sender ! read(id)
    case UpdateEntity(<%= entityVar %>: <%= entity %>) =>
      sender ! update(<%= entityVar %>)
  }

  /**
   * Lists all entities
   * @return
   */
  def list(): List[<%= entity %>] = {
    DB.withSession { implicit session: Session =>
      <%= entity %>Query.list
    }
  }

  /**
   * Deletes entity
   * @param id
   * @return number of affected rows
   */
  def delete(id: Int): Int = {
    DB.withSession { implicit session: Session =>
      <%= entity %>Query.filter(_.id === id).delete
    }
  }

  /**
   * Returns entity if it exists
   * @param id
   * @return entity
   */
  def read(id: Int): Option[<%= entity %>] = {
    DB.withSession { implicit session: Session =>
      <%= entity %>Query.filter(_.id === id).firstOption
    }
  }

  /**
   * Creates entity
   * @param <%= entityVar %>
   * @return inserted id
   */
  def create(<%= entityVar %>: <%= entity %>): Int = {
    DB.withSession { implicit session: Session =>
        (<%= entity %>Query returning <%= entity %>Query.map(_.id)) += <%= entityVar %>
    }
  }

  /**
   * Updates entity
   * @param <%= entityVar %>
   * @return number of affected rows
   */
  def update(<%= entityVar %>: <%= entity %>): Int = {
    DB.withSession { implicit session: Session =>
      <%= entity %>Query.where(_.id === <%= entityVar %>.id.get).update(<%= entityVar %>)
    }
  }

}

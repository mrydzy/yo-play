package utils

import play.{Application, Logger, GlobalSettings}

/**
 * Created by majrydzy on 14/03/15.
 */
class Global extends GlobalSettings {

  override def onStart(app: Application ) = {
    Logger.info("Application has started");

  }

  override def onStop(app: Application ): Unit =  {
    Logger.info("Application shutdown...");
  }
}

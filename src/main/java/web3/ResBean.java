package web3;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "result", eager = true)
@ApplicationScoped
public class ResBean {
    private List<Result> resList;

    @PostConstruct
    public void loadRes() {
//        resList = new ArrayList<>();

        Session hibernateSession = HibernateUtil.getNewSession();
        hibernateSession.beginTransaction();
        resList = new ArrayList<>(hibernateSession.createQuery("SELECT result FROM Result result").setMaxResults(50).getResultList());
        hibernateSession.getTransaction().commit();
        hibernateSession.close();
    }

    public void addRes(Result result) {
        resList.add(result);
    }

    public List<Result> getResList() {
        return resList;
    }

    public void submit() {
        Object obj = FacesContext.getCurrentInstance().getExternalContext().getRequest();
        HttpServletRequest request = (HttpServletRequest) obj;

        String xVal = request.getParameter("input:x_text");
        String yVal = request.getParameter("input:y_text");
        String rVal = request.getParameter("input:r_text");

        if (xVal != null || yVal != null || rVal != null) {
            double x = Double.parseDouble(xVal);
            double y = Double.parseDouble(yVal);
            double r = Double.parseDouble(rVal);

            Result result = new Result(x,y,r);
            resList.add(result);
            Session hibernateSession = HibernateUtil.getNewSession();
            hibernateSession.beginTransaction();
            hibernateSession.save(result);
            hibernateSession.getTransaction().commit();
            hibernateSession.close();
        }
    }

    public void reset() {
        System.out.println("cleared");
        resList.clear();
        Session hibernateSession = HibernateUtil.getNewSession();
        hibernateSession.beginTransaction();
        String stringQuery = "DELETE FROM Result";
        Query query = hibernateSession.createQuery(stringQuery);
        query.executeUpdate();
        hibernateSession.getTransaction().commit();
        hibernateSession.close();
    }
}

package com.cordalo.template;

import ch.cordalo.corda.common.test.CordaNodeEnvironment;
import ch.cordalo.corda.common.test.CordaTestNetwork;
import ch.cordalo.corda.common.test.CordaloBaseTests;
import com.google.common.collect.ImmutableList;
import net.corda.core.flows.FlowLogic;

import java.util.List;

public abstract class CordaloTemplateBaseTests extends CordaloBaseTests {

    public CordaloTemplateBaseTests() {
    }

    protected CordaTestNetwork network;
    protected CordaNodeEnvironment companyA;
    protected CordaNodeEnvironment companyB;
    protected CordaNodeEnvironment companyC;
    protected CordaNodeEnvironment companyD;
    protected CordaNodeEnvironment companyE;

    public List<String> getCordappPackageNames() {
        return ImmutableList.of(
                "com.cordalo.template.contracts",
                "ch.cordalo.corda.common.contracts"
        );
    }


    public void setup(boolean withNodes, Class<? extends FlowLogic> ...responderClasses) {
        this.network = new CordaTestNetwork(
                withNodes,
            this.getCordappPackageNames(),
            responderClasses
        );
        this.companyA = network.startEnv("Company-A", "O=Company-A,L=Zurich,ST=ZH,C=CH");
        this.companyB = network.startEnv("Company-B", "O=Company-B,L=Winterthur,ST=ZH,C=CH");
        this.companyC = network.startEnv("Company-C", "O=Company-C,L=Zug,ST=ZG,C=CH");
        this.companyD = network.startEnv("Company-D", "O=Company-D,L=Zurich,ST=ZH,C=CH");
        this.companyE = network.startEnv("Company-E", "O=Company-E,L=Zurich,ST=ZH,C=CH");
        this.network.startNodes();
    }

    public void tearDown() {
        if (network != null) network.stopNodes();
    };
}
